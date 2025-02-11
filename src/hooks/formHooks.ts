<<<<<<< HEAD
import {useState} from 'react';
=======
import React, {useState} from 'react';
>>>>>>> ab877c77d0810a04ef12d200cd7426ef61e49486

const useForm = (callback: () => void, initState: Record<string, string>) => {
  const [inputs, setInputs] = useState(initState);

  const handleSubmit = (event: React.SyntheticEvent) => {
    if (event) {
      event.preventDefault();
    }
    callback();
  };

  const handleInputChange = (
<<<<<<< HEAD
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    event.persist();
    // console.log(event.target.name, event.target.value);
=======
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    event.persist();
    console.log(event.target.name, event.target.value);
>>>>>>> ab877c77d0810a04ef12d200cd7426ef61e49486
    setInputs((inputs) => ({
      ...inputs,
      [event.target.name]: event.target.value,
    }));
  };

  return {
    handleSubmit,
    handleInputChange,
    inputs,
<<<<<<< HEAD
    setInputs,
=======
>>>>>>> ab877c77d0810a04ef12d200cd7426ef61e49486
  };
};

export {useForm};
