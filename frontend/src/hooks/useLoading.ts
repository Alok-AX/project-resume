import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setLoading } from '../store/slices/uiSlice';

const useLoading = (isLoading: boolean) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoading(isLoading));
  }, [isLoading, dispatch]);
};

export default useLoading;