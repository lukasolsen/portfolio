import type { FC } from "react";

export const NotFound: FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full py-20 text-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-lg mb-8">Siden du leter etter finnes ikke.</p>
      <a
        href="/"
        className="px-6 py-3 bg-primary text-white rounded-md hover:bg-primary/90 transition"
      >
        Gå tilbake til forsiden
      </a>
    </div>
  );
};
