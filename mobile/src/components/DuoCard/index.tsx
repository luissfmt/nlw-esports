import { View, TouchableOpacity, Text } from 'react-native';

import { GameController } from 'phosphor-react-native'

import { DuoInfo } from '../DuoInfo';

import { THEME } from '../../theme';
import { styles } from './styles';

export interface DuoCardProps {
    id: string,
    hourEnd: string,
    hourStart: string,
    name: string,
    useVoiceChannel: boolean,
    weekDays: string[],
    yearsPlaying: number
};

interface Props {
    data: DuoCardProps,
    onConnect: () => void
};

export const DuoCard: React.FC<Props> = ({ data, onConnect }) => {
    return (
        <View style={ styles.container }>
            <DuoInfo 
             label='Nome'
             value={ data.name }
            />

            <DuoInfo 
             label='Tempo de jogo'
             value={`${ data.yearsPlaying } ano(s)`}
            />

            <DuoInfo 
             label='Disponibilidade'
             value={`${data.weekDays.length} dia(s) \u2022 ${data.hourStart.slice(0, 2)}hr - ${data.hourEnd.slice(0, 2)}hr`}
            />

            <DuoInfo 
             label='Chamada de áudio'
             value={ data.useVoiceChannel ? 'Sim' : 'Não' }
             colorValue={ data.useVoiceChannel ? THEME.COLORS.SUCCESS : THEME.COLORS.ALERT }
            />

            <TouchableOpacity style={ styles.button } onPress={ onConnect }>
                <GameController 
                 color={ THEME.COLORS.TEXT }
                 size={ 20 }
                />

                <Text style={ styles.buttonTitle }>Conectar</Text>
            </TouchableOpacity>
        </View>
    );
};