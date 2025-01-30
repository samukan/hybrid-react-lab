// src/hooks/apiHooks.ts

import {useEffect, useState} from 'react';
import {
  MediaItem,
  MediaItemWithOwner,
  UserWithNoPassword,
} from 'hybrid-types/DBTypes';
import {fetchData} from '../lib/functions';
import {
  Credentials,
  RegisterCredentials,
  RegistrationResponse,
} from '../types/LocalTypes';
import {LoginResponse, UserResponse} from 'hybrid-types/MessageTypes';

const useMedia = () => {
  const [mediaArray, setMediaArray] = useState<MediaItemWithOwner[]>([]);

  useEffect(() => {
    const getMedia = async () => {
      try {
        // kaikki mediat ilman omistajan tietoja
        const media = await fetchData<MediaItem[]>(
          import.meta.env.VITE_MEDIA_API + '/media'
        );
        // haetaan omistajat id:n perusteella
        const mediaWithOwner: MediaItemWithOwner[] = await Promise.all(
          media.map(async (item) => {
            const owner = await fetchData<UserWithNoPassword>(
              import.meta.env.VITE_AUTH_API + '/users/' + item.user_id
            );

            const mediaItem: MediaItemWithOwner = {
              ...item,
              username: owner.username,
            };

            return mediaItem;
          })
        );

        console.log(mediaWithOwner);

        setMediaArray(mediaWithOwner);
      } catch (error) {
        console.error((error as Error).message);
      }
    };

    getMedia();
  }, []);

  return {mediaArray};
};

const useAuthentication = () => {
  const postLogin = async (credentials: Credentials) => {
    const options = {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: {'Content-Type': 'application/json'},
    };
    try {
      return await fetchData<LoginResponse>(
        import.meta.env.VITE_AUTH_API + '/auth/login',
        options
      );
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  return {postLogin};
};

const useUser = () => {
  const getUserByToken = async (token: string) => {
    const options = {
      headers: {Authorization: 'Bearer ' + token},
    };
    try {
      return await fetchData<UserResponse>(
        import.meta.env.VITE_AUTH_API + '/users/token',
        options
      );
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  const postRegister = async (credentials: RegisterCredentials) => {
    const options = {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: {'Content-Type': 'application/json'},
    };
    try {
      const response = await fetchData<RegistrationResponse>(
        import.meta.env.VITE_AUTH_API + '/users',
        options
      );
      return response;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  return {getUserByToken, postRegister};
};

const useComment = () => {
  //
};

export {useMedia, useAuthentication, useUser, useComment};
