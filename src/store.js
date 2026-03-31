export const initialStore = () => {
  return {
    //aqui declaramos todas las variables que sean globales
    message: null,
    contactsData: [],
    selected: null,
    todos: [
      {
        id: 1,
        title: "Make the bed",
        background: null,
      },
      {
        id: 2,
        title: "Do my homework",
        background: null,
      }
    ]
  }
}
//acciones --> permiten modificar las variables del initialStore
export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case 'selectedContact':
      return {
        ...store,
        selected: store.contactsData?.contacts?.find(el => el.id == action.payload.id) || null
      };

    case 'updateContactsData':
      return {
        ...store,
        contactsData: action.payload.Data
      };
    case 'add_task':

      const { id, color } = action.payload

      return {
        ...store,
        todos: store.todos.map((todo) => (todo.id === id ? { ...todo, background: color } : todo))
      };
      case 'refreshContacts':
    return {
        ...store,
        contactsData: action.payload
    };
    default:
      throw Error('Unknown action.');
  }
}
