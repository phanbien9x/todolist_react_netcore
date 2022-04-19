import { createSelector } from '@reduxjs/toolkit';

export const filtersSelector = (state) => state.filters;
export const todoListSelector = (state) => state.todoList;
export const loaderSelector = (state) => state.loader;
export const access_tokenSelector = (state) => state.access_token;
export const userinfoSelector = (state) => state.userinfo;

export const todoListRemainSelector = createSelector(filtersSelector, todoListSelector, (filters, todoList) =>
  todoList.filter(
    (item) =>
      item.name.includes(filters.search) &&
      (filters.status !== 'All' ? (filters.status === 'Completed' ? item.completed : !item.completed) : true) &&
      (filters.priorities.length > 0 ? filters.priorities.includes(item.priority) : true)
  )
);
