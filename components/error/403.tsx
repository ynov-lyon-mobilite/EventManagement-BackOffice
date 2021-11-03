import BaseError from "./BaseError";

export default function Unauthorized() {
  return <BaseError code={403} text="Unauthorized" />;
}
