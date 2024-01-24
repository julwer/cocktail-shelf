import MainText from '../UI/MainText';

type ErrorProps = {
	h1Text: string;
	h2Text: string;
	img?: any;
	alt?: string;
};

export function Error({ h1Text, h2Text, img, alt }: ErrorProps): JSX.Element {
	return (
		<div>
			<MainText
				h1Txt={h1Text}
				h2Txt={h2Text}
				h2ClassName='text-main-txt'
				className='absolute mt-4'
			/>
			{img && (
				<div className='w-2/3 h-2/3 overflow-hidden rounded-xl justify-self-center'>
					<img src={img} alt={alt} className='object-cover' />
				</div>
			)}
		</div>
	);
}
