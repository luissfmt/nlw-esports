import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';
import { View, TouchableOpacity, Image, FlatList, Text } from 'react-native';
import { useEffect, useState } from 'react';
 
import { Entypo } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native';

import logoImg from '../../assets/logo-nlw-esports.png';

import { styles } from './styles';
import { THEME } from '../../theme';

import { GameParams } from '../../@types/navigation';

import { Background } from '../../components/Background';
import { Headling } from '../../components/Headling';
import { DuoCard, DuoCardProps } from '../../components/DuoCard';
import { DuoMatch } from '../../components/DuoMatch';

export const Game: React.FC = () => {
    const [duos, setDuos] = useState<DuoCardProps[]>([]);
    const [discordDuoSelected, setDiscordDuoSelected] = useState<string>('');

    const { params } = useRoute();
    const game = params as GameParams;

    const { goBack } = useNavigation();

    const handleGoBack = () => goBack();

    const getDiscordUser = async (adsId: string) => {
        fetch(`https://1ce7-2804-1c8-8259-dc00-1817-a573-d647-c638.sa.ngrok.io/ads/${adsId}/discord`)
        .then(res => res.json())
        .then(data => setDiscordDuoSelected(data.discord));
    };

    useEffect(() => {
        fetch(`https://1ce7-2804-1c8-8259-dc00-1817-a573-d647-c638.sa.ngrok.io/games/${game.id}/ads`)
        .then(res => res.json())
        .then(data => setDuos(data));
    }, []);

    return (
        <Background>
            <SafeAreaView style={ styles.container }>
                <View style={ styles.header }>
                    <TouchableOpacity onPress={ handleGoBack }>
                        <Entypo
                         name='chevron-thin-left'
                         color={ THEME.COLORS.CAPTION_300 }
                         size={ 20 }
                        />
                    </TouchableOpacity>

                    <Image 
                     source={ logoImg }
                     style={ styles.logo }
                    />

                    <View style={ styles.right } />
                </View>

                <Image 
                 source={{ uri: game.bannerUrl }}
                 style={ styles.cover }
                 resizeMode='cover'
                />

                <Headling 
                 title={ game.title }
                 subtitle='Conecte-se e comece a jogar!'
                />
                
                <FlatList 
                 data={ duos }
                 keyExtractor={ item => item.id }
                 renderItem={ ({ item }) => <DuoCard data={ item } onConnect={ () => getDiscordUser(item.id) } /> }
                 horizontal
                 contentContainerStyle={ duos.length > 0 ? styles.contentList : styles.emptyListContent }
                 showsHorizontalScrollIndicator={ false }
                 ListEmptyComponent={ () => <Text style={ styles.emptyListText }>N??o h?? an??ncios publicados ainda.</Text> }
                />

                <DuoMatch 
                 visible={ discordDuoSelected.length > 0 }
                 onClose={ () => setDiscordDuoSelected('') }
                 discord={ discordDuoSelected }
                />

            </SafeAreaView>
        </Background>
    );
};