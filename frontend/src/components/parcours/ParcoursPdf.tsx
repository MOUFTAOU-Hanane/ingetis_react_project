import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { IParcours } from '../../interfaces';

// Styles pour le PDF
const styles = StyleSheet.create({
    page: {
        padding: 30,
        backgroundColor: '#ffffff',
        fontFamily: 'Helvetica',
    },
    header: {
        marginBottom: 20,
        borderBottomWidth: 2,
        borderBottomColor: '#d97706',
        borderBottomStyle: 'solid',
        paddingBottom: 10,
    },
    title: {
        fontSize: 24,
        color: '#d97706',
        fontWeight: 'bold',
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 12,
        color: '#666666',
        fontStyle: 'italic',
    },
    content: {
        marginTop: 20,
    },
    sectionTitle: {
        fontSize: 16,
        color: '#374151',
        fontWeight: 'bold',
        marginBottom: 15,
    },
    lieuContainer: {
        marginBottom: 15,
        padding: 10,
        backgroundColor: '#fef3c7',
        borderRadius: 5,
        borderLeftWidth: 3,
        borderLeftColor: '#d97706',
        borderLeftStyle: 'solid',
    },
    lieuNumber: {
        fontSize: 14,
        color: '#d97706',
        fontWeight: 'bold',
        marginBottom: 5,
    },
    lieuNom: {
        fontSize: 12,
        color: '#374151',
        fontWeight: 'bold',
        marginBottom: 3,
    },
    lieuAdresse: {
        fontSize: 10,
        color: '#6b7280',
        lineHeight: 1.4,
    },
    footer: {
        position: 'absolute',
        bottom: 30,
        left: 30,
        right: 30,
        textAlign: 'center',
        fontSize: 8,
        color: '#9ca3af',
        borderTopWidth: 1,
        borderTopColor: '#e5e7eb',
        borderTopStyle: 'solid',
        paddingTop: 10,
    },
    stats: {
        marginTop: 20,
        padding: 15,
        backgroundColor: '#f3f4f6',
        borderRadius: 5,
    },
    statsTitle: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#374151',
        marginBottom: 8,
    },
    statsText: {
        fontSize: 10,
        color: '#6b7280',
        marginBottom: 3,
    },
});

interface ParcoursPDFProps {
    parcours: IParcours;
}

export const ParcoursPDF: React.FC<ParcoursPDFProps> = ({ parcours }) => {
    const currentDate = new Date().toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.title}>{parcours.nom}</Text>
                    <Text style={styles.subtitle}>
                        Parcours généré le {currentDate}
                    </Text>
                </View>

                {/* Content */}
                <View style={styles.content}>
                    <Text style={styles.sectionTitle}>
                        Itinéraire ({parcours.lieux && parcours.lieux.length} étapes)
                    </Text>

                    {parcours.lieux && parcours.lieux.map((lieu, index) => (
                        <View key={index} style={styles.lieuContainer}>
                            <Text style={styles.lieuNumber}>
                                Étape {index + 1}
                            </Text>
                            <Text style={styles.lieuNom}>
                                {lieu.nom}
                            </Text>
                            <Text style={styles.lieuAdresse}>
                                • {lieu.adresse}
                            </Text>
                        </View>
                    ))}

                    {/* Statistics */}
                    <View style={styles.stats}>
                        <Text style={styles.statsTitle}>Informations du parcours</Text>
                        <Text style={styles.statsText}>
                            • Nombre total d'étapes : {parcours.lieux && parcours.lieux.length}
                        </Text>
                        <Text style={styles.statsText}>
                            • Parcours : {parcours.nom}
                        </Text>
                        <Text style={styles.statsText}>
                            • Document généré le : {currentDate}
                        </Text>
                    </View>
                </View>

                {/* Footer */}
                <Text style={styles.footer}>
                    Parcours "{parcours.nom}" - Généré automatiquement
                </Text>
            </Page>
        </Document>
    );
};
