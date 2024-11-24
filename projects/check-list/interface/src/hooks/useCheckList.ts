import React, { useState } from "react";
import { CHECKLIST } from "../types/types";

export const useCheckList = () => {
  const [lists, setLists] = useState<CHECKLIST[]>([]);
  const [inputText, setInputText] = useState("");

  const addListItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim()) {
      setLists([
        ...lists,
        {
          id: Date.now(),
          text: inputText.trim(),
          completed: false,
          selected: false,
          done: false,
        },
      ]);
      setInputText("");
    }
  };

  const toggleListItem = (id: number) => {
    setLists(lists.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
  };

  const toggleDone = (id: number) => {
    setLists(lists.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo)));
  };

  const toggleSelect = (id: number) => {
    setLists(lists.map((todo) => (todo.id === id ? { ...todo, selected: !todo.selected } : todo)));
  };

  const deleteListItem = (id: number) => {
    setLists(lists.filter((todo) => todo.id !== id));
  };

  const deleteSelectedItems = () => {
    setLists(lists.filter((todo) => !todo.selected));
  };

  const hasSelectedListItems = lists.some((todo) => todo.selected);

  return {
    lists,
    setLists,
    inputText,
    setInputText,
    toggleListItem,
    hasSelectedListItems,
    deleteListItem,
    toggleSelect,
    deleteSelectedItems,
    toggleDone,
    addListItem,
  };
};
