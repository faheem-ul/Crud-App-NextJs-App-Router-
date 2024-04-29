"use client";

import React, { useEffect, useState } from "react";
import { useContext } from "react";

import { useRouter } from "next/navigation";

import {
  addDoc,
  doc,
  collection,
  query,
  onSnapshot,
  DocumentData,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

import { AuthContext } from "@/context/context";
import { auth, db } from "../../config/firebaseConfig";

function Profile() {
  const router = useRouter();

  const [todo, setTodo] = useState("");
  const [todosMapArray, setTodosMapArray] = useState<DocumentData[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editId, setEditId] = useState(null);

  const { user } = useContext(AuthContext);
  // console.log(user);

  // console.log(todosMapArray);

  const todoCollectionRef = collection(db, "Todos");

  const handleTodoSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (isEditing && editId !== null) {
        await updateDoc(doc(db, "Todos", editId), {
          Todo: todo,
        });
      } else {
        await addDoc(todoCollectionRef, {
          Todo: todo,
        });
      }
      setTodo("");
      setIsEditing(false);
      setEditId(null);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const q = query(todoCollectionRef);
    const unsub = onSnapshot(q, (Snapshot) => {
      const todosArray: DocumentData[] = [];
      Snapshot.forEach((doc) => {
        const todoItem = { ...doc.data(), docId: doc.id };
        todosArray.push(todoItem);
      });
      setTodosMapArray(todosArray);
    });
    return () => unsub();
  }, []);

  const handleEdit = (todoData: DocumentData) => {
    setTodo(todoData.Todo);
    setIsEditing(true);
    setEditId(todoData.docId);
  };
  const handleDelete = (todoData: DocumentData) => {
    deleteDoc(doc(db, "Todos", todoData.docId));
  };

  const handleLogOut = () => {
    auth.signOut();
    router.push("/login");
  };

  return (
    <div className=" flex flex-col justify-center items-center gap-10 ">
      <h1 className="text-[30px] text-center py-4 font-bold text-blue-600">
        Profile Page
      </h1>
      <form onSubmit={handleTodoSubmit}>
        <input
          className="p-4 text-black rounded-[22px]"
          type="text"
          placeholder="Enter a todo . ."
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <button
          className="p-2 px-5 bg-blue-600 rounded-[22px] ml-8"
          type="submit"
        >
          Add Todo
        </button>
      </form>

      <ul>
        {todosMapArray.map((todoData, index) => {
          const todotext: string = todoData.Todo;
          return (
            <>
              <li
                key={index}
                className=" flex flex-row gap-10 mb-7 items-center"
              >
                {todotext}
                <button
                  className="p-2 bg-yellow-600 rounded-[22px] w-[130px]"
                  onClick={() => handleEdit(todoData)}
                >
                  Edit
                </button>
                <button
                  className="p-2 bg-red-600 rounded-[22px] w-[130px]"
                  onClick={() => handleDelete(todoData)}
                >
                  Delete
                </button>
              </li>
            </>
          );
        })}
      </ul>
      <button
        className="p-2 bg-blue-600 rounded-[22px] w-[230px]"
        onClick={handleLogOut}
      >
        Log Out
      </button>
    </div>
  );
}

export default Profile;
