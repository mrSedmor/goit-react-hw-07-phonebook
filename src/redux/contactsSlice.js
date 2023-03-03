import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts, addContact, deleteContact } from './operations';

import sortContacts from 'services/sortContacts';
import insertIntoSortedContacts from 'services/insertIntoSortedContacts';

const contactsInitialState = {
  items: [],
  isLoading: false,
  error: null,
};

const handlePending = state => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: contactsInitialState,
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.pending, handlePending)
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload;
        sortContacts(state.items);
      })
      .addCase(fetchContacts.rejected, handleRejected)

      .addCase(addContact.pending, handlePending)
      .addCase(addContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        insertIntoSortedContacts(state.items, action.payload);
      })
      .addCase(addContact.rejected, handleRejected)

      .addCase(deleteContact.pending, handlePending)
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const index = state.items.findIndex(
          ({ id }) => id === action.payload.id
        );
        state.items.splice(index, 1);
      })
      .addCase(deleteContact.rejected, handleRejected);
  },
});

// Нижче альтернативний варіант з addMatcher

// export const contactsSlice = createSlice({
//   name: 'contacts',
//   initialState: contactsInitialState,
//   extraReducers: builder => {
//     builder
//       .addCase(fetchContacts.fulfilled, (state, action) => {
//         state.items = action.payload;
//         sortContacts(state.items);
//       })
//       .addCase(addContact.fulfilled, (state, action) => {
//         insertIntoSortedContacts(state.items, action.payload);
//       })
//       .addCase(deleteContact.fulfilled, (state, action) => {
//         const index = state.items.findIndex(
//           ({ id }) => id === action.payload.id
//         );
//         state.items.splice(index, 1);
//       })
//       .addMatcher(
//         ({ type }) => type.startsWith('contacts/') && type.endsWith('/pending'),  //type.match(/^contacts\/.*\/pending$/),
//         state => {
//           state.isLoading = true;
//         }
//       )
//       .addMatcher(
//         ({ type }) => type.startsWith('contacts/') && type.endsWith('/fulfilled'), //type.match(/^contacts\/.*\/fulfilled$/),
//         state => {
//           state.isLoading = false;
//           state.error = null;
//         }
//       )
//       .addMatcher(
//         ({ type }) => type.startsWith('contacts/') && type.endsWith('/rejected'), //type.match(/^contacts\/.*\/rejected$/),
//         (state, action) => {
//           state.isLoading = false;
//           state.error = action.payload;
//         }
//       );
//   },
// });

export const contactsReducer = contactsSlice.reducer;
