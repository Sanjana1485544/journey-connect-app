import { Button, Card, Text } from '@rneui/themed';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

type PaymentMethod = 'card' | 'upi' | 'cash';

export default function PaymentScreen() {
  const router = useRouter();
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);
  const upiAmount = '120.00';
  const upiPayeeName = 'Journey Connect';
  const upiId = 'journeyconnect@upi';
  const upiTxnNote = 'Ride Payment';
  const upiPayload = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(upiPayeeName)}&am=${upiAmount}&cu=INR&tn=${encodeURIComponent(upiTxnNote)}`;
  const qrCodeUrl = `https://quickchart.io/qr?text=${encodeURIComponent(upiPayload)}&size=220`;

  const handlePayment = () => {
    // In a real app, this would process the payment
    // For now, just redirect to home
    router.replace('/');
  };

  return (
    <ScrollView style={styles.container}>
      <Card>
        <Card.Title>Select Payment Method</Card.Title>
        <Card.Divider />

        <View style={styles.paymentOptions}>
          <TouchableOpacity
            style={[
              styles.paymentOption,
              selectedMethod === 'card' && styles.selectedOption
            ]}
            onPress={() => setSelectedMethod('card')}
          >
            <Text style={styles.paymentText}>💳 Credit/Debit Card</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.paymentOption,
              selectedMethod === 'upi' && styles.selectedOption
            ]}
            onPress={() => setSelectedMethod('upi')}
          >
            <Text style={styles.paymentText}>📱 UPI</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.paymentOption,
              selectedMethod === 'cash' && styles.selectedOption
            ]}
            onPress={() => setSelectedMethod('cash')}
          >
            <Text style={styles.paymentText}>💵 Cash</Text>
          </TouchableOpacity>
        </View>

        {selectedMethod === 'upi' && (
          <View style={styles.qrSection}>
            <Text style={styles.qrTitle}>Scan to Pay</Text>
            <Image source={{ uri: qrCodeUrl }} style={styles.qrImage} />
            <Text style={styles.qrCaption}>UPI ID: {upiId}</Text>
            <Text style={styles.qrCaption}>Amount: INR {upiAmount}</Text>
          </View>
        )}

        <Button
          title="Complete Payment"
          onPress={handlePayment}
          disabled={!selectedMethod}
          containerStyle={styles.buttonContainer}
        />
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  paymentOptions: {
    marginVertical: 20,
  },
  paymentOption: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#e0e0e0',
  },
  selectedOption: {
    borderColor: '#2089dc',
    backgroundColor: '#e3f2fd',
  },
  paymentText: {
    fontSize: 16,
    textAlign: 'center',
  },
  qrSection: {
    alignItems: 'center',
    marginBottom: 16,
  },
  qrTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  qrImage: {
    width: 220,
    height: 220,
    borderRadius: 8,
    marginBottom: 10,
  },
  qrCaption: {
    fontSize: 14,
    color: '#555',
  },
  buttonContainer: {
    marginVertical: 8,
  },
}); 