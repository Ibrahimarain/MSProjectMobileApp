import {StyleSheet} from 'react-native' ;
import { widthPercentageToDP } from 'react-native-responsive-screen';
import  WP  from './WP';
import Colors from './Colors';
// const WP = widthPercentageToDP
const GlobalStyles = StyleSheet.create({
    shadow :{
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        
        elevation: 5,
    },
      regular: (size,color) => {
        return ({
          fontSize: WP(size ? size : 4),
          color: color ? color : Colors.darkBlue,
            fontFamily : 'Montserrat-Regular'
        })
      },
      semiBold: (size,color) => {
        return ({
          fontSize: WP(size ? size : 4),
          color: color ? color : Colors.darkBlue,
            fontFamily : 'Montserrat-SemiBold'
        })
      },
      Bold: (size,color) => {
        return ({
          fontSize: WP(size ? size : 4),
          color: color ? color : Colors.darkBlue,
            fontFamily : 'Montserrat-Bold'
        })
      },
  topBorder: {
    borderColor: Colors.boldBorderColor,
    borderWidth: 1,
    borderTopColor: Colors.secondary,
    borderTopWidth: 4,
    borderRadius: WP(3),
    backgroundColor: "white"
  }

});
export default GlobalStyles ;