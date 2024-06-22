import { Breadcrumbs } from "@material-tailwind/react";
 
export function BreadcrumbsDefault() {
  return (
    <div className="bg-white">
    <Breadcrumbs>
      <a href="#" className="opacity-60 text-black">
        Docs
      </a>
      <a href="#" className="opacity-60 text-black">
        Components
      </a>
      <a href="#">Breadcrumbs</a>
    </Breadcrumbs>
    </div>
  );
}