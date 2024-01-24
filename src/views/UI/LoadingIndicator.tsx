export function LoadingIndicator() {
	return (
		<div className='absolute w-[100vw] h-[100vh] flex items-center justify-center'>
			<div className='fixed w-24 h-24 rounded-full border-primary/60 border-8 drop-shadow-md border-b-primary animate-spin' />
		</div>
	);
}
