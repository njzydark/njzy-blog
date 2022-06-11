import Link from 'next/link';

const Navigation = () => {
  return (
    <nav>
      <Link href="/">
        <span className=" text-gray-900 dark:text-white px-3 py-2 mr-2 hover:bg-gray-100 dark:hover:text-black cursor-default">
          Home
        </span>
      </Link>
    </nav>
  );
};

export default Navigation;
