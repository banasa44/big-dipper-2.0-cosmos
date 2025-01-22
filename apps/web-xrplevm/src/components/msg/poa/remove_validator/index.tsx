import { MsgRemoveValidator } from '@/models';
import AppTrans from 'ui/src/components/AppTrans';
import AvatarName from 'ui/src/components/avatar_name';
import { useProfileRecoil } from 'ui/src/recoil/profiles/hooks';

const RemoveValidator = (props: { message: MsgRemoveValidator }) => {
  const { message } = props;

  const profile = useProfileRecoil(message.validator_address);

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <AppTrans
        i18nKey="message_contents:MsgRemoveValidator"
        components={[
          <AvatarName
            address={profile?.address}
            imageUrl={profile?.imageUrl}
            name={profile?.name}
          />,
        ]}
        values={{
          address: message.validator_address,
        }}
      />
    </div>
  );
};

export default RemoveValidator;
