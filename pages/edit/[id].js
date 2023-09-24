
import { useRouter } from 'next/router';
import Update from '../Update'; // Adjust the import path as needed

const EditPage = () => {
  const router = useRouter();
  const { id } = router.query; // Access the id parameter

  return (
    <div>
      {/* You can pass the id as a prop to the Update component */}
      <Update id={id} />
    </div>
  );
};

export default EditPage;