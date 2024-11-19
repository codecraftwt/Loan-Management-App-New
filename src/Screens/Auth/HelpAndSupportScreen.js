import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, Button, TouchableOpacity, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';

export default function HelpAndSupportScreen() {
    const navigation = useNavigation();
    const [message, setMessage] = useState('');

    const handleSendMessage = () => {
        if (message.trim()) {
            // Simulate sending a message (could be to an API or email)
            console.log('Message sent:', message);
            setMessage('');
            Toast.show({
                type: 'success',
                position: 'top',
                text1: 'Your message has been sent successfully!',
            });
        } else {
            Toast.show({
                type: 'error',
                position: 'top',
                text1: 'Please enter a message before sending.',
            });
        }
    };

    return (
        <>
            {/* Header Bar with Back Button */}
            <View style={styles.headerBar}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Icon name="arrow-left" size={24} color="#FFF" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Help & Support</Text>
            </View>

            {/* Help & Support Content */}
            <ScrollView style={styles.container}>
                <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>

                <View style={styles.faqItem}>
                    <Text style={styles.faqQuestion}>Q: How do I reset my password?</Text>
                    <Text style={styles.faqAnswer}>A: Go to Settings - Account - Reset Password.</Text>
                </View>

                <View style={styles.faqItem}>
                    <Text style={styles.faqQuestion}>Q: How can I contact support?</Text>
                    <Text style={styles.faqAnswer}>A: You can contact us through the form below or email us at support@loanhub.com.</Text>
                </View>

                <Text style={styles.sectionTitle}>Troubleshooting Tips</Text>
                <Text style={styles.tip}>1. Make sure your internet connection is stable.</Text>
                <Text style={styles.tip}>2. Restart the app if you experience any crashes.</Text>
                <Text style={styles.tip}>3. Update your app to the latest version from the App Store or Google Play.</Text>

                <Text style={styles.sectionTitle}>Contact Support</Text>
                <Text style={styles.sectionDescription}>If you need assistance or have any questions, feel free to contact our support team.</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Type your message here..."
                    value={message}
                    onChangeText={setMessage}
                    multiline
                    numberOfLines={4}
                />
                <TouchableOpacity
                    style={styles.subscribeButton}
                    onPress={handleSendMessage}>
                    <Text style={styles.subscribeButtonText}>Send Message</Text>
                </TouchableOpacity>

                <Text style={styles.sectionTitle}>Useful Links</Text>
                <TouchableOpacity onPress={() => Linking.openURL('https://github.com/codecraftwt/Loan-Management-App-New')}>
                    <Text style={styles.link}>Privacy Policy</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Linking.openURL('https://github.com/codecraftwt/Loan-Management-App-New')}>
                    <Text style={styles.link}>Terms of Service</Text>
                </TouchableOpacity>
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    headerBar: {
        backgroundColor: '#b80266',
        height: 70,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 10,
        borderBottomEndRadius: 30,
        borderBottomStartRadius: 30,
        elevation: 5,
    },
    backButton: {
        position: 'absolute',
        left: 15,
        top: 15,
        padding: 10,
    },
    headerText: {
        color: '#FFF',
        fontSize: 20,
        fontFamily: 'Montserrat-Bold',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBlock: 10,
    },
    sectionDescription: {
        fontSize: 16,
        color: '#555',
        marginBottom: 10,
    },
    faqItem: {
        marginBottom: 10,
    },
    faqQuestion: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    faqAnswer: {
        fontSize: 16,
        color: '#555',
        marginLeft: 10,
    },
    tip: {
        fontSize: 16,
        color: '#555',
        marginLeft: 10,
    },
    input: {
        height: 100,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        fontSize: 16,
        marginBottom: 15,
    },
    link: {
        fontSize: 16,
        color: '#b80266',
        textDecorationLine: 'underline',
        marginBottom: 10,
    },
    subscribeButton: {
        backgroundColor: '#b80266',
        borderRadius: 8,
        paddingVertical: 12,
        alignItems: 'center',
        width: '100%',

    },
    subscribeButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
