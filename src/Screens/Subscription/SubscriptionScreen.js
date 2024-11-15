import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';

const SubscriptionScreen = () => {
    const [selectedPlan, setSelectedPlan] = useState(null);

    const handleSubscription = (plan) => {
        setSelectedPlan(plan);

    };

    return (
        <SafeAreaView style={styles.safeContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Header Bar */}
                <View style={styles.headerBar}>
                    <Text style={styles.headerText}>Subscription Plans</Text>
                </View>

                <View style={styles.container}>
                    <Text style={styles.title}>Choose Your Plan</Text>
                    <Text style={styles.subtitle}>Select a plan to proceed with the subscription and enjoy premium features.</Text>

                    {/* Monthly Plan */}
                    <TouchableOpacity
                        style={[styles.button, selectedPlan === 'Monthly' && styles.selectedButton]}
                        onPress={() => handleSubscription('Monthly')}
                    >
                        <Text style={[styles.buttonText, selectedPlan === 'Monthly' && styles.selectedButtonText]}>Monthly Plan - ₹399</Text>
                    </TouchableOpacity>

                    {/* Yearly Plan */}
                    <TouchableOpacity
                        style={[styles.button, selectedPlan === 'Yearly' && styles.selectedButton]}
                        onPress={() => handleSubscription('Yearly')}
                    >
                        <Text style={[styles.buttonText, selectedPlan === 'Yearly' && styles.selectedButtonText]}>Yearly Plan - ₹2999</Text>
                    </TouchableOpacity>

                    {/* Proceed Button */}
                    {selectedPlan && (
                        <TouchableOpacity style={styles.subscribeButton}>
                            <Text style={styles.subscribeButtonText}>Proceed to Payment</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        backgroundColor: '#f7f7f7',
    },
    container: {
        flex: 1,
        paddingHorizontal: 16,
        paddingBlock: 30,

        justifyContent: 'center',
        alignItems: 'center',
    },
    headerBar: {
        backgroundColor: '#FF6B35',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomEndRadius: 15,
        borderBottomStartRadius: 15,
    },
    headerText: {
        color: '#FFFFFF',
        fontSize: 22,
        fontFamily: 'Montserrat-Bold',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginVertical: 16,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#777',
        marginBottom: 24,
        textAlign: 'center',
        lineHeight: 22,
        paddingHorizontal: 24,
    },
    button: {
        backgroundColor: '#fff',
        padding: 18,
        borderRadius: 10,
        marginBottom: 16,
        width: '90%',
        borderWidth: 1,
        borderColor: '#ddd',
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedButton: {
        backgroundColor: '#4CAF50',
        borderColor: '#4CAF50',
    },
    selectedButtonText: {
        color: '#fff', // White text for the selected button
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
        color: '#333',
    },
    subscribeButton: {
        backgroundColor: '#FF6B35',
        borderRadius: 8,
        paddingVertical: 14,
        alignItems: 'center',
        width: '90%',
        marginTop: 20,
    },
    subscribeButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontFamily: 'Poppins-SemiBold',
    },
});

export default SubscriptionScreen;
