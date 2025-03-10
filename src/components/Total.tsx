interface TotalProps {
  value: number;
}
export const Total = (props: TotalProps) => (
  <div>
    <h1>There are {props.value} products</h1>
  </div>
);
