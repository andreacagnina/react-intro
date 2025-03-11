// accetto le proprs dal Genitore, specifico il tipo number per avere un maggior controllo sul dato
interface TotalProps {
  value: number;
}
// Devo esportare il componente per importarlo nel componente Genitore. Essendo il mio componente sotto forma di arrow, posso passare il ricevente delle props come argomento e interpolare il valore delle props stesse
export const Total = (props: TotalProps) => (
  <div>
    <h1>There are {props.value} products</h1>
  </div>
);
