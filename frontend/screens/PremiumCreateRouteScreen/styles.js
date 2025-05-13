import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FCFFFF',
        justifyContent: 'space-around', 
        alignItems: 'center', 
      },
      filtersContainer: {
        flex: 1,
        width: '100%',
        justifyContent: 'flex-end',
        flexDirection: 'column',
      },
      filtersTitle: {
        marginTop: 25,
    
        fontSize: 16,
        fontWeight: 500,
      },
      filtersPlaceContainer: {
        width: '100%',
        marginTop: 30,
    
        backgroundColor: '#EFF3FF',
    
        borderRadius:22,
    
        shadowColor: '#000000', 
            shadowOffset: {
            width: 0,
            height: 2,
            },
            shadowOpacity: 0.5,
            shadowRadius: 4,
            elevation: 5, 
      },
      filtersDurationContainer: {
        flex: 1, 
        width: '100%',
        height: 240,
        backgroundColor: '#EFF3FF',
    
        borderRadius:22,
    
        shadowColor: '#000000', 
            shadowOffset: {
            width: 0,
            height: 2,
            },
            shadowOpacity: 0.5,
            shadowRadius: 4,
            elevation: 5, 
      },
      tagContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      tag: {
        padding: 16,
        fontSize: 16,
      },
      tagLevel: {
        padding: 16,
        marginLeft: 20,
      },
      functionalImage: {
        width: 20,
        height: 20,
      },
      durationTitleContainer: {
        width: '100%',
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
      },
      durationContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      durationTitle: {
        fontSize: 16,
        fontWeight: 500,
      },
      duration: {
        padding: 16,
      },
      headerContainer: {
        marginTop: 25,
        marginBottom: 15,
      },
      title: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
      },
      locationContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
      },
      locationImage: {
        width: 29,
        height: 29,
        marginRight: 5,
      },
      location: {
        fontSize: 16,
        fontWeight: '400',
      },
      scrollView: {
        flex: 1,
      },
      scrollContent: {
        paddingBottom: 50,
      },
      mapContainer: {
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        borderRadius: 10,
      },
      map: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
      },
      contentPoints: {
        borderRadius: 22,
        padding: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 5,
        marginBottom: 20,
      },
      pointText: {
        marginVertical: 7,
        fontSize: 16,
      },
      timeDistanceContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginBottom: 20,
      },
      timeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      time: {
        fontSize: 16,
        fontWeight: '400',
      },
      distance: {
        fontSize: 16,
        fontWeight: '400',
      },
      ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      ratingImage: {
        width: 22,
        height: 21,
        marginRight: 5,
      },
      rating: {
        fontSize: 16,
        fontWeight: '400',
      },
      timeImage: {
        width: 24,
        height: 26,
        marginRight: 5,
        marginBottom: 2,
      },
      footer: {
        position: 'absolute',
        bottom: 50,
        left: 20,
        right: 20,
        zIndex: 10,
      },
      chooseButton: {
        width: '100%',
        height: 50, 
        justifyContent: 'center',
      },

});

export default styles;