import type { FormEventHandler, ReactNode } from "react";
import Button from "./Button";

type Props = {
  onSubmit: FormEventHandler;
  label: string;
};

export const PlayerForm = ({ onSubmit, label }: Props) => {
  return (
    <form className="stack" onSubmit={onSubmit} style={{ gridArea: "input" }}>
      <div className="card guess-form">
        <input
          name="name"
          type="text"
          placeholder="Votre pseudo"
          required
        />
      </div>
      <Button>{label}</Button>
    </form>
  );
}
