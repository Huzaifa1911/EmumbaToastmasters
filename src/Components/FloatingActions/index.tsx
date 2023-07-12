import React, {useMemo, useState} from 'react';
import {FAB, FABGroupProps, Portal} from 'react-native-paper';
import {IconSource} from 'react-native-paper/lib/typescript/src/components/Icon';

import {useAppTheme} from 'Assets';

interface IFloatingActionsProps
  extends Omit<FABGroupProps, 'open' | 'visible' | 'onStateChange' | 'icon'> {
  icon: IconSource;
  secondaryIcon?: IconSource;
}

const FloatingActions = (props: IFloatingActionsProps) => {
  const {icon, secondaryIcon, ...rest} = props;

  const [openFab, setOpenFab] = useState(false);
  const {colors} = useAppTheme();

  const iconToShow = useMemo(() => {
    return openFab ? (secondaryIcon ? secondaryIcon : icon) : icon;
  }, [icon, secondaryIcon, openFab]);

  const onStateChange = ({open}: {open: boolean}) => setOpenFab(open);
  return (
    <Portal>
      <FAB.Group
        {...rest}
        open={openFab}
        backdropColor={colors.backdrop}
        visible
        onStateChange={onStateChange}
        icon={iconToShow}
      />
    </Portal>
  );
};

export default FloatingActions;
