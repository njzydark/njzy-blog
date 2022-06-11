import Image from 'next/image';

import Avatar from '../public/images/avatar.jpeg';

export const PersonProfile = () => {
  return (
    <div className="flex">
      <Image className="rounded-full" src={Avatar} width={58} height={58} />
      <div className="ml-4 flex flex-col justify-around">
        <p className="py-0 my-0">
          Personal blog by{' '}
          <a href={process.env.NEXT_PUBLIC_GITHUB} target="_blank" rel="noreferrer">
            {process.env.NEXT_PUBLIC_AUTHOR}
          </a>
        </p>
        <p className="py-0 my-0">非淡泊无以明志，非宁静无以致远</p>
      </div>
    </div>
  );
};
