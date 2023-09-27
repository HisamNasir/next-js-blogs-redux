
import { useRouter } from 'next/router';
import Update from '../update';

const EditPage = () => {
  const router = useRouter();
  const { id } = router.query; 

  return (
    <div>
      <Update id={id} />
    </div>
  );
};

export default EditPage;