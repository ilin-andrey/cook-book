"use client";

import { useEffect } from "react";

import { Button } from "~/components/atoms/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="py-24 px-6 sm:py-32 lg:px-8">
      <p>Something went wrong!</p>
      <Button onClick={reset}>Reset error boundary</Button>
    </div>
  );
}
