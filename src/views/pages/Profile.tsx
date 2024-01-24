import { Header } from '../UI/Header';
import { LoadingIndicator } from '../UI/LoadingIndicator';

export function ProfilePage() {
	return (
		<>
			<Header />
			<main className='m-4'>
				<p>Owner id: </p>
				<p>Username: </p>
			</main>
		</>
	);
}
