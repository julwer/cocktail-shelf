import Button from '../../../components/Button';
import { Input } from '../../../components/Input';

type ImgFileInputProps = {
	setImg: (arg: { imgFile?: File | null; imgPreview: string }) => void;
	img: { imgFile?: File | null; imgPreview: string };
};

export function ImgFileInput({ setImg, img }: ImgFileInputProps) {
	const handleFileInputChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const file = event.target.files && event.target.files[0];

		if (file) {
			setImg({
				...img,
				imgFile: file,
				imgPreview: URL.createObjectURL(file),
			});
		}
	};

	function handleDeletePhoto() {
		setImg({ ...img, imgFile: null as File | null, imgPreview: '' });
	}

	const iconStyle: object = { fontSize: '70px' };
	return (
		<label
			htmlFor='fileInput'
			className='flex flex-col items-center border-2 w-full border-dashed rounded-md cursor-pointer border-outline mb-4 transition delay-100 hover:border-primary'>
			<Button
				onClick={handleDeletePhoto}
				className='bg-form/50 w-10 h-10 rounded-md flex items-center justify-center hover:text-primary text-main-txt self-end mt-2 mr-2 '>
				<span className='material-symbols-outlined text-3xl'>delete</span>
			</Button>
			<div className='w-32 h-32 overflow-hidden flex items-center justify-center rounded-md'>
				{img.imgPreview !== '' ? (
					<img
						src={img.imgPreview}
						alt='Selected'
						className='object-cover h-full w-full'
					/>
				) : (
					<span
						className='material-symbols-outlined text-primary flex items-center justify-center'
						style={iconStyle}>
						image
					</span>
				)}
			</div>
			<p className='text-main-txt font-bold mt-4 text-center text-l text-wrap pb-5'>
				{img.imgPreview !== ''
					? 'Your photo has been added!'
					: 'Add Cover Photo'}
			</p>
			<Input
				type='file'
				className='hidden'
				id='fileInput'
				autocomplete='off'
				name='img'
				onChange={(event) => handleFileInputChange(event)}
				accept='image/png, image/jpeg'
			/>
		</label>
	);
}
