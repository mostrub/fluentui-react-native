import * as React from 'react';
import { Persona } from '../../../components/Persona/Persona';
import { PersonaSize, PersonaPresence } from '../../../components/PersonaCoin';
import { styles, rajeshImageUrl } from './styles';
import { View, Text, Switch, Picker } from 'react-native';
import { getAllEnumValues, undefinedText } from '../PersonaCoin/utils';

const allSizes = getAllEnumValues(PersonaSize);

interface ISwitchWithLabelProps {
  label: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
}

function SwitchWithLabel(props: ISwitchWithLabelProps): React.ReactElement {
  const { label, value, onValueChange } = props;
  return (
    <View style={styles.switch}>
      <Text>{label}</Text>
      <Switch value={value} onValueChange={onValueChange} />
    </View>
  );
}

export const StandardUsage: React.FunctionComponent<{}> = () => {
  const [showImage, setShowImage] = React.useState(true);
  const [showPrimary, setShowPrimary] = React.useState(true);
  const [showSecondary, setShowSecondary] = React.useState(true);
  const [showTertiary, setShowTertiary] = React.useState(true);
  const [showOptional, setShowOptional] = React.useState(true);
  const [imageSize, setImageSize] = React.useState<PersonaSize | undefined>(PersonaSize.size72);

  return (
    <View style={styles.root}>
      {/* settings */}
      <View style={styles.settings}>
        <SwitchWithLabel label="Show image" value={showImage} onValueChange={setShowImage} />
        <SwitchWithLabel label="Show primary text" value={showPrimary} onValueChange={setShowPrimary} />
        <SwitchWithLabel label="Show secondary text" value={showSecondary} onValueChange={setShowSecondary} />
        <SwitchWithLabel label="Show tertiary text" value={showTertiary} onValueChange={setShowTertiary} />
        <SwitchWithLabel label="Show optional text" value={showOptional} onValueChange={setShowOptional} />

        <Picker
          prompt="Size"
          style={styles.header}
          selectedValue={imageSize !== undefined ? PersonaSize[imageSize] : undefinedText}
          onValueChange={size => setImageSize(PersonaSize[size as string])}
        >
          {allSizes.map((size, index) => (
            <Picker.Item label={size} key={index} value={size} />
          ))}
        </Picker>
      </View>

      <Persona
        text={showPrimary ? 'Rajesh Jha' : undefined}
        secondaryText={showSecondary ? 'Executive Vice President' : undefined}
        tertiaryText={showTertiary ? 'Experiences and Devices' : undefined}
        optionalText={showOptional ? 'Building 36/5600' : undefined}
        size={imageSize}
        initials="RJ"
        imageUrl={showImage ? rajeshImageUrl : undefined}
        imageDescription="Profile photo of Rajesh Jha"
        presence={PersonaPresence.away}
      />
    </View>
  );
};
