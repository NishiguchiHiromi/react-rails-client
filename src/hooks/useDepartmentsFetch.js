import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import api from '../service/api';

const DEFAULT_DEPARTMENTS = [
  { id: uuidv4(), name: '代表取締役', depth: 0 },
  { id: uuidv4(), name: '営業部', depth: 1 },
  { id: uuidv4(), name: '営業第一課', depth: 2 },
  { id: uuidv4(), name: '経理部', depth: 1 },
  { id: uuidv4(), name: '開発部', depth: 1 },
];

const useDepartmentsFetch = () => {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const getDepartments = () => {
      console.log('fetchDepartments');
      api
        .getDepartments()
        .then((res) => {
          const depts = res.data;
          setDepartments(depts.length > 0 ? depts : DEFAULT_DEPARTMENTS);
        })
        .catch((res) => console.log(res));
    };

    getDepartments();
  }, []);
  return [departments, setDepartments];
};
export default useDepartmentsFetch;
