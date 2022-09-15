import { FlatList, Image, View } from 'react-native';

import logoImg from '../../assets/logo-nlw-esports.png';
import { GameCard } from '../../components/GameCard';
import { Headling } from '../../components/Headling';

import { GAMES } from '../../utils/games';

import { styles } from './styles';

export const Home: React.FC = () => {
    return (
        <View style={ styles.container }>
            <Image source={ logoImg }/>

            <Headling 
             title='Encontre seu duo!'
             subtitle='Selecione o game que deseja jogar...'
            />

            <FlatList 
             data={ GAMES }
             keyExtractor={ item => item.id }
             renderItem={ ({ item }) => <GameCard data={ item } /> }
             horizontal
             showsHorizontalScrollIndicator={ false }
             contentContainerStyle={ styles.contentList }
            />
        </View>
    );
};