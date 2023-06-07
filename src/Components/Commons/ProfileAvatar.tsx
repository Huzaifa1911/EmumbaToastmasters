import React, {useState} from 'react';
import {Avatar, AvatarImageProps} from 'react-native-paper';

import {DEFAULT_IMAGE} from 'Utils';

interface IProfileAvatarProps
  extends Omit<AvatarImageProps, 'source' | 'onError'> {
  uri: string;
}

const ProfileAvatar = ({size = 50, uri, ...rest}: IProfileAvatarProps) => {
  const [hasError, setHasError] = useState(uri.length === 0);

  const onError = () => {
    setHasError(true);
  };

  return (
    <Avatar.Image
      size={size}
      source={{uri: hasError ? DEFAULT_IMAGE : uri}}
      onError={onError}
      {...rest}
    />
  );
};

export default ProfileAvatar;
