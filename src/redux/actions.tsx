export  function addNoteAction(notetext) {
   return{
    type: 'addNote',
    payload: notetext
}
  };
 export  function deleteNoteAction(id) {
    return{
     type: 'deleteNote',
     payload: id
 }
   };

