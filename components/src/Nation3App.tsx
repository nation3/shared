import React from "react";

export default function Nation3App({
  children,
}: {
  children: React.ReactElement | React.ReactElement[];
}) {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500&display=swap"
      />
      {children}
    </>
  );
}
