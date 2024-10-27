interface NavInput {
  name: string;
  href: string;
  current: boolean;
}

const CreateNavComp = ({
  page,
  ClickNav,
}: {
  page: NavInput;
  ClickNav: Function;
}) => {
  return (
    <li key={page.name} className="flex">
      <div className="flex items-center">
        <svg
          fill="currentColor"
          viewBox="0 0 24 44"
          preserveAspectRatio="none"
          aria-hidden="true"
          className="h-full w-6 flex-shrink-0 text-gray-200"
        >
          <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
        </svg>
        <a
          onClick={() => ClickNav(page.name)}
          aria-current={page.current ? "page" : undefined}
          className={
            page.current
              ? "ml-4 text-sm font-medium text-indigo-800 underline decoration-indigo-800 decoration-double hover:text-gray-700 cursor-pointer"
              : "ml-4 text-sm font-medium text-gray-500 hover:text-gray-700 cursor-pointer"
          }
        >
          {page.name}
        </a>
      </div>
    </li>
  );
};
export default CreateNavComp;
