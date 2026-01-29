import React, { useState } from 'react';
import useFetch from '../../../hooks/useFetch';
import ReviewCard from './ReviewCard';
import Modal from '../../../components/Modal';
import toast from 'react-hot-toast';
import useManageReview from '../hooks/useManageReview';
import { useSelector } from 'react-redux';

function ReviewList({ filter }) {
  const { user } = useSelector(state => state.auth);
  const { data: reviews, setData: setReviews, error } = useFetch('/review', {
    params: (() => {
      switch (filter) {
        case 'all':
          return { status: 'assigned' };
        case 'assigned':
          return { userId: user?._id, status: 'assigned' };
        case 'mySubmitted':
          return { userId: user?._id, status: 'completed' };
        case 'allSubmitted':
          return { status: 'completed' };
        default:
          return {};
      }
    })()
  });

  const [show, setShow] = useState({
    success: false,
    rId: null
  });
  const { handleDeleteReview } = useManageReview();

  const onDelete = async () => {
    const rId = await handleDeleteReview(show?.rId)
    if (rId) {
      setReviews(prevReviews => prevReviews.filter(review => review._id !== rId));
      toast.success("review deleted successfully");
    }
    setShow({ success: false, title: '', rId: null });
  }

  const onCancel = () => {
    setShow(null);
  }

  const handleShowModal = (userName, projectName, rId) => {
    setShow({
      success: true,
      title: `the project "${projectName}" for user "${userName}"`,
      rId
    });
  }

  if (error) return <p className="text-red-500">Error: {error.message}</p>;
  if (!reviews || reviews.length === 0) return <p>No reviews found.</p>;

  return (
    <div className="grid grid-cols-1 2xl:grid-cols-2  gap-4">
      {reviews.map((review) => (
        <ReviewCard key={review._id} review={review} handleShowModal={handleShowModal} />
      ))}
      {
        show?.success &&
        <Modal show={show} onCancel={onCancel} onDelete={onDelete} />
      }
    </div>

  );
}

export default ReviewList;
