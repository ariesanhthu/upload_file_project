'use client';
 
import * as React from 'react';
import { useEdgeStore } from '@/lib/edgestore';
 import { useState } from "react";

export default function Page() {
  const [file, setFile] = React.useState<File>();
  const { edgestore } = useEdgeStore();

  const [urls, setUrls] = useState<
    string  | undefined
  >();
 
  return (
    <div>
      <input
        type="file"
        onChange={(e) => {
          setFile(e.target.files?.[0]);
        }}
      />
      <button
        onClick={async () => {
          if (file) {
            const res = await edgestore.publicFiles.upload({
              file,
              onProgressChange: (progress) => {
                // you can use this to show a progress bar
                console.log(progress);
              },
            });
            // you can run some server action or api here
            // to add the necessary data to your database
            console.log(res);

            setUrls(
                res.url
              );
          }
        }}
      >
        Upload
      </button>
        <div>
            {urls ? (
            <img src={urls} alt="uploaded image" />
            ) : null}
        </div>
    </div>
  );
}