import { useState } from 'react';
import { View, Modal, ModalProps, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';

import { styles } from './styles';
import { THEME } from '../../theme';

import { MaterialIcons } from '@expo/vector-icons';

import * as Clipboard from 'expo-clipboard';

import { CheckCircle } from 'phosphor-react-native';

import { Headling } from '../Headling';

interface Props extends ModalProps {
    discord: string,
    onClose: () => void
};

export const DuoMatch: React.FC<Props> = ({ discord, onClose, ...rest }) => {
    const [isCopying, setIsCopying] = useState<boolean>(false);

    const handleCopyDiscordToClipboard = async () => {
        setIsCopying(true);
        await Clipboard.setStringAsync(discord);

        Alert.alert('Discord copiado!', 'Usuário copiado para você adicioná-lo.');
        setIsCopying(false);
    };

    return (
        <Modal 
         { ...rest } 
         transparent 
         statusBarTranslucent
         animationType='fade'
        >
            <View style={ styles.container }>

                <View style={ styles.content }>
                    <TouchableOpacity 
                     style={ styles.closeIcon }
                     onPress={ onClose } 
                    >
                        <MaterialIcons 
                         name='close'
                         size={ 20 }
                         color={ THEME.COLORS.CAPTION_500 }
                        />
                    </TouchableOpacity>

                    <CheckCircle 
                     size={ 64 }
                     color={ THEME.COLORS.SUCCESS }
                     weight={ 'bold' }
                    />

                    <Headling 
                     title="Let's Play!"
                     subtitle='Agora é só começar a jogar!'
                     style={{ alignItems: 'center', marginTop: 24 }}
                    />

                    <Text style={ styles.label }>
                        Adicione no Discord
                    </Text>

                    <TouchableOpacity 
                     style={ styles.discordButton }
                     onPress={ handleCopyDiscordToClipboard }
                     disabled={ isCopying }
                     >
                        <Text style={ styles.discord }>
                            { isCopying ? <ActivityIndicator color={ THEME.COLORS.PRIMARY } /> : discord }
                        </Text>
                    </TouchableOpacity>
                </View>

            </View>
        </Modal>
    );
};