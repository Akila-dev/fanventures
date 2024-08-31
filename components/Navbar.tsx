import React from 'react';
import Image from 'next/image';

const Navbar = () => {
	return (
		<div className="px-5 md:px-[3rem] xl:px-[4rem] max-w-[1240px] mx-auto flex flex-col text-center justify-center gap-5 py-7">
			<div>
				<Image
					src="/imgs/logo.png"
					alt="Fan Ventures"
					width={299}
					height={47}
					className="h-[20px] md:h-[30px] w-auto object-contain"
				/>
			</div>
		</div>
	);
};

export default Navbar;
