export function LoadingIndicator() {
	return (
		<div className='absolute w-screen h-screen flex items-center justify-center z-50'>
			<div className='fixed w-24 h-24 rounded-full border-primary/60 border-8 drop-shadow-md border-b-primary animate-spin' />
		</div>
	);
}
