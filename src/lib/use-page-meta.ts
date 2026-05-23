import { useEffect } from "react";

type MetaOptions = {
  title: string;
  description?: string;
};

export function usePageMeta({ title, description }: MetaOptions) {
  useEffect(() => {
    document.title = title;

    if (description == null) {
      return;
    }

    const selector = 'meta[name="description"]';
    let meta = document.head.querySelector<HTMLMetaElement>(selector);

    if (meta == null) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }

    meta.setAttribute("content", description);
  }, [description, title]);
}
