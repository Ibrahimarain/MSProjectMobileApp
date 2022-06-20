import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
const WP = (num) => {
    if (widthPercentageToDP(100) < heightPercentageToDP(100)) {
      return widthPercentageToDP(num)
    } else {
      return heightPercentageToDP(num)
    }
  };
  
  
  export default WP;
  