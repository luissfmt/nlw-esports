import { Text, View, ViewProps } from "react-native";
import { styles } from "./styles";

interface Props extends ViewProps {
    title: string,
    subtitle: string
};

export const Headling: React.FC<Props> = ({ title, subtitle, ...rest }) => {
    return (
        <View style={ styles.container } { ...rest }>
            <Text style={ styles.title }>
                { title }
            </Text>

            <Text style={ styles.subtitle }>
                { subtitle }
            </Text>
        </View>
    );
};