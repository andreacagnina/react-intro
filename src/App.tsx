import { useEffect, useState } from "react";
import { User } from "./model/user";
import { Empty } from "./components/Empty";
import { Total } from "./components/Total";
import axios from "axios";
function App() {
  // usiamo useState per tenere sapere quanti prodotti abbiamo in origine e modificarli con setTotalProducts
  const [totalProducts, setTotalProducts] = useState<number>(10);
  function inc() {
    setTotalProducts((s) => s + 1);
  }

  // creo un array di oggetti di utenti. Nella realtà questi dati arriveranno da un DB tramite un chiamata REST

  // const initialState = [
  //   { id: 1, name: "Fabio" },
  //   { id: 2, name: "Luca" },
  //   { id: 3, name: "Giovanni" },
  // ];

  // const [users, setUsers] = useState(initialState);

  // Visto che i dati arriveranno dal DB, inizializziamo un array vuoto

  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    // la fetch ci restituisce una promise che ci serve per recuperare i dati e usiamo .json per visualizzarli che a sua volta restituisce una promise e finalmente abbiamo il risultato che possiamo salvare nel nostro state utilizzando setuser
    //   fetch("https://jsonplaceholder.typicode.com/users")
    //     .then((res) => res.json())
    //     .then((res) => setUsers(res));
    //fetch è una funzione nativa di Js, restituisce una promise che da una risposta ad una richiesta fatta. Con fetch la promise viene risolta anche se il codice di stato della risposta è un errore (404 o 500) e quindi bisogna controllare manualmente (response.ok) se la risposta è stata risolta con successo. Con fetch bisogna convertire manualmente la risposta in jason usando .json()
    // Axios invece è una libreria esterna che restituisce una promise e gestisce automaticamente sia il paring della risposta  che la gestione di errori, rifiutando automaticamente la promise in base allo stato
    axios
      .get<User[]>("https://jsonplaceholder.typicode.com/users")
      .then((res) => setUsers(res.data));
  }, []);

  function addUser() {
    // anche qui invece di fetch usiamo axios. Il codice viene ridotto drasticamente con axios.

    // fetch("https://jsonplaceholder.typicode.com/users", {
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   method: "POST",
    //   body: JSON.stringify({
    //     name: `user ${Math.floor(Math.random() * 10)}`,
    //   }),
    // })
    //   .then((res) => res.json())
    //   .then((res) => setUsers((s) => [...s, res]));
    axios
      .post<User>("https://jsonplaceholder.typicode.com/users", {
        name: `user ${Math.floor(Math.random() * 10)}`,
      })
      .then((res) => setUsers((s) => [...s, res.data]));
  }

  return (
    <>
      {/*  Operatore ternario condizione n prodotti. Se > 0 mostra il totale attraverso props altrimenti non ci sono prodotti  */}
      {totalProducts > 0 ? <Total value={totalProducts} /> : <Empty />}
      {/* al click chiama una funzione e aggiungi un prodotto al totale */}
      <button onClick={inc}>Add</button>
      <hr></hr>
      {/* itero con map users, restituendo un li con key obbligatoria e con il nome di ogni user */}
      <ul>
        {users.map((user) => {
          return (
            <li key={user.id}>
              {user.id} - {user.name}
            </li>
          );
        })}
      </ul>
      <button onClick={addUser}>Add</button>
    </>
  );
}

export default App;
