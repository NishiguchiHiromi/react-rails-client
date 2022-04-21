import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import useInitialFetch from 'hooks/useInitialFetch';

const DEFAULT_DEPARTMENTS = [
  { id: uuidv4(), name: '代表取締役', depth: 0 },
  { id: uuidv4(), name: '営業部', depth: 1 },
  { id: uuidv4(), name: '営業第一課', depth: 2 },
  { id: uuidv4(), name: '経理部', depth: 1 },
  { id: uuidv4(), name: '開発部', depth: 1 },
];

const useDepartmentsFetch = () => {
  const data = useInitialFetch('departments/tree');
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    setDepartments(data && data.length > 0 ? data : DEFAULT_DEPARTMENTS);
  }, [data]);
  return [departments, setDepartments];
};
export default useDepartmentsFetch;
