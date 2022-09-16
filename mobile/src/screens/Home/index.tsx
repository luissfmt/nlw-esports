import { useEffect, useState } from 'react';
import { FlatList, Image } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { useNavigation } from '@react-navigation/native';

import logoImg from '../../assets/logo-nlw-esports.png';

import { Background } from '../../components/Background';
import { GameCard, GameCardProps } from '../../components/GameCard';
import { Headling } from '../../components/Headling';

import { styles } from './styles';

export const Home: React.FC = () => {
    const [games, setGames] = useState<GameCardProps[]>([]);

    const { navigate } = useNavigation();

    const handleOpenGame = ({ id, title, bannerUrl }: GameCardProps) => navigate('game', { id, title, bannerUrl });

    useEffect(() => {
        fetch('https://5ff7-2804-1c8-8259-dc00-d8e8-3ec4-a2f-39cb.sa.ngrok.io/games')
        .then(res => res.json())
        .then(data => setGames(data));
    }, []);

    return (
        <Background>
            <SafeAreaView style={ styles.container }>
                <Image 
                 source={ logoImg }
                 style={ styles.logo }
                />

                <Headling 
                title='Encontre seu duo!'
                subtitle='Selecione o game que deseja jogar...'
                />

                <FlatList 
                data={ games }
                keyExtractor={ item => item.id }
                renderItem={ ({ item }) => {
                    return (
                        <GameCard data={ item } 
                         onPress={ () => handleOpenGame(item) } 
                        />
                    );
                } }
                horizontal
                showsHorizontalScrollIndicator={ false }
                contentContainerStyle={ styles.contentList }
                />
            </SafeAreaView>
        </Background>
    );
};