"use client";

import { NextStudio } from "next-sanity/studio";
import config from "../../../sanity.config";
import { isSanityConfigured } from "@/sanity/env";

export default function StudioPage() {
  if (!isSanityConfigured) {
    return (
      <div className="studio-setup">
        <div>
          <span>Quantum MEP Content Studio</span>
          <h1>Sanity credentials are required.</h1>
          <p>Add the project ID and dataset shown in <code>.env.example</code>, then restart the development server.</p>
        </div>
      </div>
    );
  }

  return <NextStudio config={config} />;
}
